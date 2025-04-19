# Preval test case

# try_finally_throw2.md

> Flow > Try block throw early > Try finally throw2
>
> The throw may leave the binding mutated anyways

## Input

`````js filename=intro
function f() {
  let x = 'pass';
  try {
    x = 'fail';
    throw 'yes';
  } finally {
    $('still throws');
    $(x); // but we can observe x here
  }
  $(x);
}
f();
`````


## Settled


`````js filename=intro
$(`still throws`);
$(`fail`);
throw `yes`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`still throws`);
$(`fail`);
throw `yes`;
`````


## PST Settled
With rename=true

`````js filename=intro
$( "still throws" );
$( "fail" );
throw "yes";
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? TemplateLiteral


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'still throws'
 - 2: 'fail'
 - eval returned: ('<crash[ yes ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
