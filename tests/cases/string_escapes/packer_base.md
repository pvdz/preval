# Preval test case

# packer_base.md

> String escapes > Packer base

From https://richosoft2.co.uk/resources/jspack/
This is `console.log('boo')` after Dean's PACKER minifier.

## Input

`````js filename=intro
eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0.1(\'2\')',3,3,'console|log|boo'.split('|'),0,{}))
`````


## Settled


`````js filename=intro
eval(`console.log('boo')`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
eval(`console.log('boo')`);
`````


## PST Settled
With rename=true

`````js filename=intro
eval( "console.log('boo')" );
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) objects in isFree check
- (todo) inline computed array property read


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
