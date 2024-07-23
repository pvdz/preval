# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Statement > For in right > Auto ident call computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (let x in b[$("$")](1));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
for (let x in b[$(`\$`)](1));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCompObj = b;
const tmpCallCompProp = $(`\$`);
const tmpForInDeclRhs = tmpCallCompObj[tmpCallCompProp](1);
let x = undefined;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCallCompProp = $(`\$`);
const tmpForInDeclRhs = b[tmpCallCompProp](1);
let x = undefined;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = {
  a: 999,
  b: 1000,
};
const c = $( "$" );
const d = a[ c ]( 1 );
let e = undefined;
for (e in d) {

}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
