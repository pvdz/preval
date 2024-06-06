# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[$($(0)) || 2];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[$($(0)) || 2];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpCompProp = tmpCallCallee(tmpCalleeParam);
if (tmpCompProp) {
} else {
  tmpCompProp = 2;
}
tmpCompObj[tmpCompProp];
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const obj = {};
const tmpCalleeParam = $(0);
let tmpCompProp = $(tmpCalleeParam);
if (tmpCompProp) {
} else {
  tmpCompProp = 2;
}
obj[tmpCompProp];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = {};
const c = $( 0 );
let d = $( c );
if (d) {

}
else {
  d = 2;
}
b[ d ];
$( a );
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
