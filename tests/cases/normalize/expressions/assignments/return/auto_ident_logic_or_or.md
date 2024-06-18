# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > Return > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = $($(0)) || $($(1)) || $($(2)));
}
$(f());
$(a);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return (a = $($(0)) || $($(1)) || $($(2)));
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
  const tmpCalleeParam = $(0);
  a = tmpCallCallee(tmpCalleeParam);
  if (a) {
    return a;
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    a = tmpCallCallee$1(tmpCalleeParam$1);
    if (a) {
      return a;
    } else {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(2);
      a = tmpCallCallee$3(tmpCalleeParam$3);
      return a;
    }
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
let tmpCalleeParam$5 = undefined;
const tmpCalleeParam = $(0);
let a = $(tmpCalleeParam);
if (a) {
  tmpCalleeParam$5 = a;
} else {
  const tmpCalleeParam$1 = $(1);
  a = $(tmpCalleeParam$1);
  if (a) {
    tmpCalleeParam$5 = a;
  } else {
    const tmpCalleeParam$3 = $(2);
    a = $(tmpCalleeParam$3);
    tmpCalleeParam$5 = a;
  }
}
$(tmpCalleeParam$5);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $( 0 );
let c = $( b );
if (c) {
  a = c;
}
else {
  const d = $( 1 );
  c = $( d );
  if (c) {
    a = c;
  }
  else {
    const e = $( 2 );
    c = $( e );
    a = c;
  }
}
$( a );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
