# Preval test case

# auto_ident_new_prop_c-seq.md

> Normalize > Expressions > Statement > Binary both > Auto ident new prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
new (1, 2, $(b)).$(1) + new (1, 2, $(b)).$(1);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
new (1, 2, $(b)).$(1) + new (1, 2, $(b)).$(1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
const tmpBinBothLhs = new tmpNewCallee(1);
const tmpCompObj$1 = $(b);
const tmpNewCallee$1 = tmpCompObj$1.$;
const tmpBinBothRhs = new tmpNewCallee$1(1);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
const tmpBinBothLhs = new tmpNewCallee(1);
const tmpCompObj$1 = $(b);
const tmpNewCallee$1 = tmpCompObj$1.$;
const tmpBinBothRhs = new tmpNewCallee$1(1);
tmpBinBothLhs + tmpBinBothRhs;
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
const c = $( a );
const d = c.$;
const e = new d( 1 );
const f = $( a );
const g = f.$;
const h = new g( 1 );
e + h;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: { $: '"<$>"' }
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
