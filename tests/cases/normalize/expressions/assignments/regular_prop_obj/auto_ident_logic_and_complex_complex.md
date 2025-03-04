# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = $($(1)) && $($(2))).a;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = $($(1)) && $($(2))).a;
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
a = tmpCallCallee(tmpCalleeParam);
if (a) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(2);
  a = tmpCallCallee$1(tmpCalleeParam$1);
} else {
}
let tmpCompObj = a;
tmpCompObj.a;
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam);
let tmpCompObj /*:unknown*/ = undefined;
if (a) {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  a = $(tmpCalleeParam$1);
  tmpCompObj = a;
} else {
  tmpCompObj = a;
}
tmpCompObj.a;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
let c = undefined;
if (b) {
  const d = $( 2 );
  b = $( d );
  c = b;
}
else {
  c = b;
}
c.a;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
