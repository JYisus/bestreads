
# ZAP Scanning Report

Generated on Tue, 27 Apr 2021 21:43:01


## Summary of Alerts

| Risk Level | Number of Alerts |
| --- | --- |
| High | 0 |
| Medium | 1 |
| Low | 1 |
| Informational | 0 |

## Alerts

| Name | Risk Level | Number of Instances |
| --- | --- | --- | 
| CSP: Wildcard Directive | Medium | 4 | 
| Server Leaks Information via "X-Powered-By" HTTP Response Header Field(s) | Low | 4 | 

## Alert Detail


  
  
  
  
### CSP: Wildcard Directive
##### Medium (Medium)
  
  
  
  
#### Description
<p>The following directives either allow wildcard sources (or ancestors), are not defined, or are overly broadly defined: </p><p>frame-ancestors, form-action</p><p></p><p>The directive(s): frame-ancestors, form-action are among the directives that do not fallback to default-src, missing/excluding them is the same as allowing anything.</p>
  
  
  
* URL: [http://localhost:3000/robots.txt](http://localhost:3000/robots.txt)
  
  
  * Method: `GET`
  
  
  * Parameter: `Content-Security-Policy`
  
  
  * Evidence: `default-src 'none'`
  
  
  
  
* URL: [http://localhost:3000/sitemap.xml](http://localhost:3000/sitemap.xml)
  
  
  * Method: `GET`
  
  
  * Parameter: `Content-Security-Policy`
  
  
  * Evidence: `default-src 'none'`
  
  
  
  
* URL: [http://localhost:3000](http://localhost:3000)
  
  
  * Method: `GET`
  
  
  * Parameter: `Content-Security-Policy`
  
  
  * Evidence: `default-src 'none'`
  
  
  
  
* URL: [http://localhost:3000/](http://localhost:3000/)
  
  
  * Method: `GET`
  
  
  * Parameter: `Content-Security-Policy`
  
  
  * Evidence: `default-src 'none'`
  
  
  
  
Instances: 4
  
### Solution
<p>Ensure that your web server, application server, load balancer, etc. is properly configured to set the Content-Security-Policy header.</p>
  
### Reference
* http://www.w3.org/TR/CSP2/
* http://www.w3.org/TR/CSP/
* http://caniuse.com/#search=content+security+policy
* http://content-security-policy.com/
* https://github.com/shapesecurity/salvation
* https://developers.google.com/web/fundamentals/security/csp#policy_applies_to_a_wide_variety_of_resources

  
#### CWE Id : 16
  
#### WASC Id : 15
  
#### Source ID : 3

  
  
  
  
### Server Leaks Information via "X-Powered-By" HTTP Response Header Field(s)
##### Low (Medium)
  
  
  
  
#### Description
<p>The web/application server is leaking information via one or more "X-Powered-By" HTTP response headers. Access to such information may facilitate attackers identifying other frameworks/components your web application is reliant upon and the vulnerabilities such components may be subject to.</p>
  
  
  
* URL: [http://localhost:3000/robots.txt](http://localhost:3000/robots.txt)
  
  
  * Method: `GET`
  
  
  * Evidence: `X-Powered-By: Express`
  
  
  
  
* URL: [http://localhost:3000/sitemap.xml](http://localhost:3000/sitemap.xml)
  
  
  * Method: `GET`
  
  
  * Evidence: `X-Powered-By: Express`
  
  
  
  
* URL: [http://localhost:3000/](http://localhost:3000/)
  
  
  * Method: `GET`
  
  
  * Evidence: `X-Powered-By: Express`
  
  
  
  
* URL: [http://localhost:3000](http://localhost:3000)
  
  
  * Method: `GET`
  
  
  * Evidence: `X-Powered-By: Express`
  
  
  
  
Instances: 4
  
### Solution
<p>Ensure that your web server, application server, load balancer, etc. is configured to suppress "X-Powered-By" headers.</p>
  
### Reference
* http://blogs.msdn.com/b/varunm/archive/2013/04/23/remove-unwanted-http-response-headers.aspx
* http://www.troyhunt.com/2012/02/shhh-dont-let-your-response-headers.html

  
#### CWE Id : 200
  
#### WASC Id : 13
  
#### Source ID : 3
