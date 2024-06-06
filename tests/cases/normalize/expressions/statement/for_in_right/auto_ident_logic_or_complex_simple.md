# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > For in right > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in $($(0)) || 2);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in $($(0)) || 2);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpForInDeclRhs = tmpCallCallee(tmpCalleeParam);
if (tmpForInDeclRhs) {
} else {
  tmpForInDeclRhs = 2;
}
let x = undefined;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(0);
let tmpForInDeclRhs = $(tmpCalleeParam);
if (tmpForInDeclRhs) {
} else {
  tmpForInDeclRhs = 2;
}
let x = undefined;
for (x in tmpForInDeclRhs) {
}
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
let c = undefined;
for (c in b) {

}
const d = {
a: 999,
b: 1000
;
$( d );
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
