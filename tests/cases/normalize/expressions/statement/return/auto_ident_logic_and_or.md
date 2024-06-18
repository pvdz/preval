# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Return > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return ($($(1)) && $($(1))) || $($(2));
}
$(f());
$(a);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return ($($(1)) && $($(1))) || $($(2));
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  let tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  if (tmpReturnArg) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpReturnArg = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
  }
  if (tmpReturnArg) {
    return tmpReturnArg;
  } else {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    tmpReturnArg = tmpCallCallee$3(tmpCalleeParam$3);
    return tmpReturnArg;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$5 = $;
const tmpCalleeParam$5 = f();
tmpCallCallee$5(tmpCalleeParam$5);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
let tmpReturnArg = $(tmpCalleeParam);
if (tmpReturnArg) {
  const tmpCalleeParam$1 = $(1);
  tmpReturnArg = $(tmpCalleeParam$1);
} else {
}
if (tmpReturnArg) {
  $(tmpReturnArg);
} else {
  const tmpCalleeParam$3 = $(2);
  const tmpClusterSSA_tmpReturnArg = $(tmpCalleeParam$3);
  $(tmpClusterSSA_tmpReturnArg);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
}
if (b) {
  $( b );
}
else {
  const d = $( 2 );
  const e = $( d );
  $( e );
}
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
