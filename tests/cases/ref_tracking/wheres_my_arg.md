# Preval test case

# wheres_my_arg.md

> Ref tracking > Wheres my arg
>
> This covers an edge case that led the callback param to drop one arg, which was unsafe 
> because the caller (string replace) can not updated accordingly.

## Input

`````js filename=intro
const callback = function(unused, capture_group) {
  $('capped:', capture_group);
  const tmpIfTest$15 = `xyz` === capture_group;
  if (tmpIfTest$15) {
    return $("then", capture_group);
  } else {
    $('else', capture_group);
  }
};
const getThing = function() {
  const regex = new RegExp(`random([a-z]{1,4}|\\/)`, ``);
  return 'randomstring'.replace(regex, callback);
};
$('result:', getThing());
`````


## Settled


`````js filename=intro
$(`capped:`, `stri`);
$(`else`, `stri`);
$(`result:`, `undefinedng`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`capped:`, `stri`);
$(`else`, `stri`);
$(`result:`, `undefinedng`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "capped:", "stri" );
$( "else", "stri" );
$( "result:", "undefinedng" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const callback = function ($$0, $$1) {
  let unused = $$0;
  let capture_group = $$1;
  debugger;
  $(`capped:`, capture_group);
  const tmpIfTest$15 = `xyz` === capture_group;
  if (tmpIfTest$15) {
    const tmpReturnArg = $(`then`, capture_group);
    return tmpReturnArg;
  } else {
    $(`else`, capture_group);
    return undefined;
  }
};
const getThing = function () {
  debugger;
  const regex = new $regex_constructor(`random([a-z]{1,4}|\\/)`, ``);
  const tmpMCF = $string_replace;
  const tmpReturnArg$1 = $dotCall($string_replace, `randomstring`, `replace`, regex, callback);
  return tmpReturnArg$1;
};
let tmpCalleeParam = getThing();
$(`result:`, tmpCalleeParam);
`````


## Todos triggered


- (todo) sticky flag, lastindex cases


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'capped:', 'stri'
 - 2: 'else', 'stri'
 - 3: 'result:', 'undefinedng'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
