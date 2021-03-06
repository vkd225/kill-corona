import json
import os
import boto3

def add_rank(username, score):
  '''
  Update the leaderboard with new rank
  '''

  try:
    s3 = boto3.resource('s3')
    bucketname = 'kill-corona'
    itemname = 'ranks.json'

    data = send_ranks() # get data from s3 bucket
    games = get_all_games() # get all games data

    all_games = games['games']
    new_game = {'username': username, 'score':score}

    all_games.append(new_game)

    # update all_games file in s3
    s3object = s3.Object(bucketname, 'all_games.json')
    s3object.put(
      Body=(bytes(json.dumps(games).encode('UTF-8')))
    )

    # increment gamesPlayed
    data['gamesPlayed'] = data.get('gamesPlayed', 0) + 1

    # update leaderboard if score is greater than rank 20
    last_score = data['ranks'][-1]['score']

    if (score > last_score):
      for player in data['ranks']:
        if score >= player.get('score'):
          player['rank'] = player['rank'] + 1

      for player in data['ranks']:
        if score >= player.get('score'):
          new_rank = player['rank'] - 1
          data['ranks'].insert(new_rank-1,  {"rank": new_rank, "username": username, "score": score})
          break

      # remove rank 21
      data['ranks'].pop()

      # write file back to s3 bucket
      s3object = s3.Object(bucketname, itemname)
      s3object.put(
        Body=(bytes(json.dumps(data).encode('UTF-8')))
      )
    
    return 'ranks added'

  except Exception as e:
    print (e)
    return 'Error'

def get_all_games():
  '''
  get all games data
  '''
  s3 = boto3.resource('s3')
  bucketname = 'kill-corona'
  itemname = 'all_games.json'

  obj = s3.Object(bucketname, itemname)
  file_content = obj.get()['Body'].read().decode('utf-8')
  games = json.loads(file_content)
  return games

def send_ranks():
  '''
  Send ranks to leaderboard
  '''
  s3 = boto3.resource('s3')
  bucketname = 'kill-corona'
  itemname = 'ranks.json'

  obj = s3.Object(bucketname, itemname)
  file_content = obj.get()['Body'].read().decode('utf-8')
  ranks = json.loads(file_content)
  return ranks


def lambda_handler(event, context):
  request = event.get('request')

  if request == 'get_ranks':
    ranks = send_ranks()
    return ranks

  elif request == 'post_rank':
    username = event.get('username')
    score = event.get('score')
    add_user = add_rank(username, score)
    return add_user

  else:
    return 'invalid input'


# Used for testing
if __name__ == '__main__':
  with open('test_event.json', 'r') as f_in:
    test_event = json.load(f_in)

  response = lambda_handler(test_event, None)
  print(response)