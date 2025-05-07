# Preval test case

# packer_twice.md

> String escapes > Packer twice

From https://richosoft2.co.uk/resources/jspack/
This is `console.log('bo\`\'\"o')` after Dean's PACKER minifier.
It is packed twice (output becomes input)

## Input

`````js filename=intro
eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0.1(\'2\\`\\\'\\"\\3\')',4,4,'console|log|bo|x20o'.split('|'),0,{}))
`````


## Settled


`````js filename=intro
eval(`console.log('bo\\\`\\'\\"\\x20o')`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
eval(`console.log('bo\\\`\\'\\"\\x20o')`);
`````


## PST Settled
With rename=true

`````js filename=intro
eval( "console.log('bo\\`\\'\\\"\\x20o')" );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) objects in isFree check
- (todo) can we always safely clone ident refs in this case?
- (todo) Support this node type in isFree: NewExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
