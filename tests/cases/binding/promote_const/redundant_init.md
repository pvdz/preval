# Preval test case

# redundant_init.md

> Binding > Promote const > Redundant init
>
> Explicitly initializes a let, only to override it

## Input

`````js filename=intro
const SSA_SNe$596 = $([10, 20, 30, 40]);
function f() {
  if (tmpIfTest$32854) {
    let tmpReturnArg$21651 = undefined;
    const tmpCalleeParam$36039 = $(1);
    const tmpCalleeParam$36040 = $(2);
    const tmpCalleeParam$36041 = SSA_SNe$596[4];
    const tmpCalleeParam$36042 = SSA_SNe$596[2];
    const tmpCalleeParam$36043 = SSA_SNe$596[3];
    const tmpCalleeParam$36044 = SSA_SNe$596[1];
    tmpReturnArg$21651 = $(
      100,
      tmpCalleeParam$36039,
      101,
      tmpCalleeParam$36040,
      tmpCalleeParam$36041,
      tmpCalleeParam$36042,
      tmpCalleeParam$36043,
      102,
      tmpCalleeParam$36044,
    );
    return tmpReturnArg$21651;
  }
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if (tmpIfTest$32854) {
    let tmpReturnArg$21651 = undefined;
    const tmpCalleeParam$36039 = $(1);
    const tmpCalleeParam$36040 = $(2);
    const tmpCalleeParam$36041 = SSA_SNe$596[4];
    const tmpCalleeParam$36042 = SSA_SNe$596[2];
    const tmpCalleeParam$36043 = SSA_SNe$596[3];
    const tmpCalleeParam$36044 = SSA_SNe$596[1];
    tmpReturnArg$21651 = $(
      100,
      tmpCalleeParam$36039,
      101,
      tmpCalleeParam$36040,
      tmpCalleeParam$36041,
      tmpCalleeParam$36042,
      tmpCalleeParam$36043,
      102,
      tmpCalleeParam$36044,
    );
    return tmpReturnArg$21651;
  }
};
const SSA_SNe$596 = $([10, 20, 30, 40]);
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  if (tmpIfTest$32854) {
    let tmpReturnArg$21651 = undefined;
    const tmpCalleeParam$36039 = $(1);
    const tmpCalleeParam$36040 = $(2);
    const tmpCalleeParam$36041 = SSA_SNe$596[4];
    const tmpCalleeParam$36042 = SSA_SNe$596[2];
    const tmpCalleeParam$36043 = SSA_SNe$596[3];
    const tmpCalleeParam$36044 = SSA_SNe$596[1];
    tmpReturnArg$21651 = $(
      100,
      tmpCalleeParam$36039,
      101,
      tmpCalleeParam$36040,
      tmpCalleeParam$36041,
      tmpCalleeParam$36042,
      tmpCalleeParam$36043,
      102,
      tmpCalleeParam$36044,
    );
    return tmpReturnArg$21651;
  } else {
    return undefined;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = [10, 20, 30, 40];
const SSA_SNe$596 = tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:array*/ = [10, 20, 30, 40];
const SSA_SNe$596 = $(tmpCalleeParam);
if (tmpIfTest$32854) {
  const tmpCalleeParam$36039 = $(1);
  const tmpCalleeParam$36040 = $(2);
  const tmpCalleeParam$36041 = SSA_SNe$596[4];
  const tmpCalleeParam$36042 = SSA_SNe$596[2];
  const tmpCalleeParam$36043 = SSA_SNe$596[3];
  const tmpCalleeParam$36044 = SSA_SNe$596[1];
  const tmpReturnArg$21651 = $(
    100,
    tmpCalleeParam$36039,
    101,
    tmpCalleeParam$36040,
    tmpCalleeParam$36041,
    tmpCalleeParam$36042,
    tmpCalleeParam$36043,
    102,
    tmpCalleeParam$36044,
  );
  $(tmpReturnArg$21651);
} else {
  $(undefined);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 10, 20, 30, 40 ];
const b = $( a );
if (tmpIfTest$32854) {
  const c = $( 1 );
  const d = $( 2 );
  const e = b[ 4 ];
  const f = b[ 2 ];
  const g = b[ 3 ];
  const h = b[ 1 ];
  const i = $( 100, c, 101, d, e, f, g, 102, h );
  $( i );
}
else {
  $( undefined );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

tmpIfTest$32854

## Result

Should call `$` with:
 - 1: [10, 20, 30, 40]
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
