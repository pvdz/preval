# Preval test case

# auto_ident_new_computed_simple_complex.md

> Normalize > Expressions > Statement > Stmt global block > Auto ident new computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
{
  let b = { $ };

  let a = { a: 999, b: 1000 };
  new b[$("$")](1);
  $(a);
}
`````

## Pre Normal


`````js filename=intro
{
  let b = { $: $ };
  let a = { a: 999, b: 1000 };
  new b[$(`\$`)](1);
  $(a);
}
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpCompProp = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCompProp];
new tmpNewCallee(1);
$(a);
`````

## Output


`````js filename=intro
const tmpCompProp = $(`\$`);
const b = { $: $ };
const tmpNewCallee = b[tmpCompProp];
new tmpNewCallee(1);
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ];
new c( 1 );
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
 - 1: '$'
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
