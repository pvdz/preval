# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Param default > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = $($(1)) && $($(1)) && $($(2))) {}
$(f());
$(a);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? $($(1)) && $($(1)) && $($(2)) : tmpParamBare;
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    p = tmpCallCallee(tmpCalleeParam);
    if (p) {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(1);
      p = tmpCallCallee$1(tmpCalleeParam$1);
      if (p) {
        const tmpCallCallee$3 = $;
        const tmpCalleeParam$3 = $(2);
        p = tmpCallCallee$3(tmpCalleeParam$3);
        return undefined;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  } else {
    p = tmpParamBare;
    return undefined;
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
const tmpCalleeParam /*:unknown*/ = $(1);
const p /*:unknown*/ = $(tmpCalleeParam);
if (p) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_p /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_p) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    $(tmpCalleeParam$3);
  } else {
  }
} else {
}
$(undefined);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
if (b) {
  const c = $( 1 );
  const d = $( c );
  if (d) {
    const e = $( 2 );
    $( e );
  }
}
$( undefined );
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
 - 5: 2
 - 6: 2
 - 7: undefined
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
