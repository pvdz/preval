# Preval test case

# string_spy.md

> Array > Static context > String spy
>
> Trying to break the String([1,2,3]) trick

## Input

`````js filename=intro
function f() {
  $('updating');
  arr[0] = 'pass';
}
const arr = ['fail', 2, 3];
f();
f();
$(String(arr));
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  $(`updating`);
  arr[0] = `pass`;
  return undefined;
};
const arr /*:array*/ = [`fail`, 2, 3];
f();
f();
const tmpCalleeParam /*:string*/ = $coerce(arr, `string`);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $(`updating`);
  arr[0] = `pass`;
};
const arr = [`fail`, 2, 3];
f();
f();
$($coerce(arr, `string`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "updating" );
  b[0] = "pass";
  return undefined;
};
const b = [ "fail", 2, 3 ];
a();
a();
const c = $coerce( b, "string" );
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'updating'
 - 2: 'updating'
 - 3: 'pass,2,3'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
