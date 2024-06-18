# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > Regular prop obj > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
($($(1)) && $($(2))).a;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
($($(1)) && $($(2))).a;
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpCompObj = tmpCallCallee(tmpCalleeParam);
if (tmpCompObj) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(2);
  tmpCompObj = tmpCallCallee$1(tmpCalleeParam$1);
} else {
}
tmpCompObj.a;
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
let tmpCompObj = $(tmpCalleeParam);
if (tmpCompObj) {
  const tmpCalleeParam$1 = $(2);
  tmpCompObj = $(tmpCalleeParam$1);
} else {
}
tmpCompObj.a;
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 2 );
  b = $( c );
}
b.a;
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
 - 3: 2
 - 4: 2
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
