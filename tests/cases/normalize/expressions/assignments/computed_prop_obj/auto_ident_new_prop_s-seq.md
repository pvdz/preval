# Preval test case

# auto_ident_new_prop_s-seq.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto ident new prop s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
(a = new (1, 2, b).$(1))["a"];
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
(a = new (1, 2, b).$(1))[`a`];
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj$1 = b;
const tmpNewCallee = tmpCompObj$1.$;
a = new tmpNewCallee(1);
let tmpCompObj = a;
tmpCompObj.a;
$(a);
`````

## Output


`````js filename=intro
const tmpClusterSSA_a /*:object*/ = new $(1);
tmpClusterSSA_a.a;
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = new $( 1 );
a.a;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
