# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > Computed prop obj > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
($($(0)) || 2)["a"];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
($($(0)) || 2)[`a`];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpCompObj = tmpCallCallee(tmpCalleeParam);
if (tmpCompObj) {
} else {
  tmpCompObj = 2;
}
tmpCompObj.a;
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(0);
let tmpCompObj = $(tmpCalleeParam);
if (tmpCompObj) {
} else {
  tmpCompObj = 2;
}
tmpCompObj.a;
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  b = 2;
}
b.a;
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
