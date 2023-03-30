import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */

// export a default function for API route to work
export default async function asynchandler(req, res) {
  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2ODAxNjM4MTAsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NsZnVzdzNydDN2MXAwMXVlYXo4bmJ4NTAvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6ImE0Y2U2OGE5LTg0OTUtNDc5Yi04OTc4LWNhN2FkYTY5ZTExNyIsImp0aSI6ImNsZnV1NWd6czN3NnIwMXVuZW5xaDV2cDQifQ.3SWspk6L1oCvL_NKCkHgztCbyz_Q9XnMvxFUar-GZRJNvfj0hFfmThi17v97E3Mavk_9PpXfzDuX8GaaGgk82kv51F_2bG3uQVTEElljjOQ-F1JuoVkYw5pOJB0ujyYGA-cCiOJS4lApEoEW0uIeUgxlPj_Uh_fHq-9EKBx-SEb7c1SW5SgBQIPZnml82mxoKgZtW7OZM-TJuAr5YqHySA4glHvr6VsdC8rhD3N57isompkOdkHQq48CEdQyx88OYm4mmMB7Hp8wZZjZyqVFtFibOWBcSZcuIFo6u5B9sSmt80FOfr5SGzZyNig-YO6YBEj9QoH7nMoRdAYj6DZPytGeyWY4bzyQBSEpEvIIi5rvnoDuIlS_AWOtxLWF9kvwLQWS05FzskOve8gAv1i294msB_ZiEH-saBqbSVc5lKSD2phny61Xh4lrntHrm8e-maxuEp0pYKgx3tVQ7BDV1f3SF64SEqYpJ6GHyhe41ay-W5AV1E1Kr3YschizVmmW-LxJkgTA1kUU2sSz6LhDKvLvyQxoP0ig_LVZLB6SItBWt6gqwv0yaGMINO_8piuthI7wY2fjWzbbNNDRIuAsEL9E-DKm2cF39prUFna-SSv4LZb57yYWbFhxcLUfjr0KKiYiSd0Iet2k2o-kE74f_LjT5glZhUm_-okzHdZZ5vE"}`,
    },
  });

  
  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `;

  const result = await graphQLClient.request(query, {
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
    slug: req.body.slug,
  });

  return res.status(200).send(result);
}
