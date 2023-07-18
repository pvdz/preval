# Preval test case

# auto_ident_new_prop_s-seq.md

> Normalize > Expressions > Assignments > Binary both > Auto ident new prop s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new (1, 2, b).$(1)) + (a = new (1, 2, b).$(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = new (1, 2, b).$(1)) + (a = new (1, 2, b).$(1)));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCompObj = b;
const tmpNewCallee = tmpCompObj.$;
a = new tmpNewCallee(1);
let tmpBinBothLhs = a;
const tmpCompObj$1 = b;
const tmpNewCallee$1 = tmpCompObj$1.$;
a = new tmpNewCallee$1(1);
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpClusterSSA_a = new $(1);
const tmpClusterSSA_a$1 = new $(1);
const tmpCalleeParam = tmpClusterSSA_a + tmpClusterSSA_a$1;
$(tmpCalleeParam);
$(tmpClusterSSA_a$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = new $( 1 );
const b = new $( 1 );
const c = a + b;
$( c );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: '[object Object][object Object]'
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
