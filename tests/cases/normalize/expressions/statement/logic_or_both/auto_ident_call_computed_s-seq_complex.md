# Preval test case

# auto_ident_call_computed_s-seq_complex.md

> Normalize > Expressions > Statement > Logic or both > Auto ident call computed s-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
(1, 2, b)[$("$")](1) || (1, 2, b)[$("$")](1);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
(1, 2, b)[$(`\$`)](1) || (1, 2, b)[$(`\$`)](1);
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCompObj = b;
const tmpCallCompProp = $(`\$`);
const tmpIfTest = tmpCallCompObj[tmpCallCompProp](1);
if (tmpIfTest) {
} else {
  const tmpCallCompObj$1 = b;
  const tmpCallCompProp$1 = $(`\$`);
  tmpCallCompObj$1[tmpCallCompProp$1](1);
}
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCallCompProp = $(`\$`);
const tmpIfTest = b[tmpCallCompProp](1);
if (tmpIfTest) {
} else {
  const tmpCallCompProp$1 = $(`\$`);
  b[tmpCallCompProp$1](1);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = {
a: 999,
b: 1000
;
const c = $( "$" );
const d = a[ c ]( 1 )};
if (d) {

}
else {
  const e = $( "$" );
  a[ e ]( 1 )};
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
