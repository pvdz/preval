# Preval test case

# inline_remainder-if.md

> Normalize > Return > Inline remainder-if
>
> If one branch returns early the remainder of the parent block should be inlined after the other branch.

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    $(2);
    return $(3);
  }
  $(4);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($(1)) {
    $(2);
    return $(3);
  }
  $(4);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(2);
    const tmpReturnArg = $(3);
    return tmpReturnArg;
  } else {
    $(4);
    return undefined;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
let tmpCalleeParam /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(2);
  const tmpReturnArg /*:unknown*/ = $(3);
  tmpCalleeParam = tmpReturnArg;
} else {
  $(4);
}
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $( 1 );
if (b) {
  $( 2 );
  const c = $( 3 );
  a = c;
}
else {
  $( 4 );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
