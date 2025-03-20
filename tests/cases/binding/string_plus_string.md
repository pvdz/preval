# Preval test case

# string_plus_string.md

> Binding > String plus string
>
> Caught this regression in the wild. Due to incorrect order of string concat it would flip ab to ba in this example.
> The rest was mandatory code to open the specific path to repro the bug.

## Input

`````js filename=intro
const arr = [ `A`, `B` ];
const f = function() {
  const a = arr[0];
  const b = arr[1];
  const ab = a + b;
  const c = `C`;
  const abc = ab + c;
  $(a, b, ab, c, abc);
  return abc;
};
$(f);
$(f());
`````

## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  $(`A`, `B`, `AB`, `C`, `ABC`);
  return `ABC`;
};
$(f);
$(`A`, `B`, `AB`, `C`, `ABC`);
$(`ABC`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {
  $(`A`, `B`, `AB`, `C`, `ABC`);
  return `ABC`;
});
$(`A`, `B`, `AB`, `C`, `ABC`);
$(`ABC`);
`````

## Pre Normal


`````js filename=intro
const arr = [`A`, `B`];
const f = function () {
  debugger;
  const a = arr[0];
  const b = arr[1];
  const ab = a + b;
  const c = `C`;
  const abc = ab + c;
  $(a, b, ab, c, abc);
  return abc;
};
$(f);
$(f());
`````

## Normalized


`````js filename=intro
const arr = [`A`, `B`];
const f = function () {
  debugger;
  const a = arr[0];
  const b = arr[1];
  const ab = a + b;
  const c = `C`;
  const abc = ab + c;
  $(a, b, ab, c, abc);
  return abc;
};
$(f);
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "A", "B", "AB", "C", "ABC" );
  return "ABC";
};
$( a );
$( "A", "B", "AB", "C", "ABC" );
$( "ABC" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<function>'
 - 2: 'A', 'B', 'AB', 'C', 'ABC'
 - 3: 'ABC'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- inline computed array property read
