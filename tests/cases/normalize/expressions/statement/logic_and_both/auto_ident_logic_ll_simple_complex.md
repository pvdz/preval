# Preval test case

# auto_ident_logic_ll_simple_complex.md

> Normalize > Expressions > Statement > Logic and both > Auto ident logic ll simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
(0 || $($(1))) && (0 || $($(1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
(0 || $($(1))) && (0 || $($(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = 0;
if (tmpIfTest) {
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  tmpIfTest = tmpCallCallee(tmpCalleeParam);
}
if (tmpIfTest) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpCallCallee$1(tmpCalleeParam$1);
} else {
}
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  $(tmpCalleeParam$1);
} else {
}
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
  $( c );
}
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
