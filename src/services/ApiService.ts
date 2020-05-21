
import * as HttpStatus from 'http-status-codes';

interface IProps {
    functions: any;
}

const base_url = 'https://ve7erna0rb.execute-api.us-east-1.amazonaws.com/prod/ranks?'

export class ApiService {
    // @ts-ignore
    private readonly props: IProps;

    constructor(props: IProps) {
        this.props = props;    
    }

    public async getranks () {
        let url = base_url + 'request=get_ranks'
        try {
          let result = await fetch(url, {
            method: 'GET',
          });

          // Bail if status code is not OK
          if ((result.status).toString() !== (HttpStatus.OK).toString()) return undefined;

          // Read response
          let response = await result.json();
          return response;
        } catch (error) {
          return undefined;
        }
    }

    public async postScore (username: string, score:number) {
        let url = base_url + 'request=post_rank&username=' + username + '&score=' + score.toString()
        try {
          let result = await fetch(url, {
            method: 'GET',
          });

          // Bail if status code is not OK
          if ((result.status).toString() !== (HttpStatus.OK).toString()) return undefined;

          // Read response
          let response = await result.json();
          return response;
        } catch (error) {
          return undefined;
        }
    }
}