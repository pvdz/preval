# Preval test case

# auto_ident_call_prop_simple.md

> Normalize > Expressions > Statement > Tagged > Auto ident call prop simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$`before ${b.$(1)} after`;
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$([`before `, ` after`], b.$(1));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpCalleeParam$1 = b.$(1);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
const tmpCalleeParam$1 = b.$(1);
$(tmpCalleeParam, tmpCalleeParam$1);
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
const c = [ "before ", " after" ];
const d = a.$( 1 );
$( c, d );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: ['before ', ' after'], 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
