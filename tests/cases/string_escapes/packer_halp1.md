# Preval test case

# packer_halp1.md

> String escapes > Packer halp1
>
> This is the following code packed with Dean's packer (https://richosoft2.co.uk/resources/jspack/)
> 
> ```
> "a\`b\"c\'d\\e\x20f\u0020g${not_expr}h\/i"
> ```
> 
> Encoded once.

## Input

`````js filename=intro
const x = eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('"0\\`1\\"2\\\'3\\\\4\\5\\6${7}8\\/9"',10,10,'a|b|c|d|e|x20f|u0020g|not_expr|h|i'.split('|'),0,{}));
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = eval(`"a\\\`b\\"c\\'d\\\\e\\x20f\\u0020g\${not_expr}h\\/i"`);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(eval(`"a\\\`b\\"c\\'d\\\\e\\x20f\\u0020g\${not_expr}h\\/i"`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = eval( "\"a\\`b\\\"c\\'d\\\\e\\x20f\\u0020g${not_expr}h\\/i\"" );
$( a );
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) objects in isFree check
- (todo) can we always safely clone ident refs in this case?
- (todo) Support this node type in isFree: NewExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a`b"c\'d\\e f g${not_expr}h/i'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
