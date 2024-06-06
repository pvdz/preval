# Preval test case

# auto_ident_new_prop_simple.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident new prop simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = new b.$(1))];
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = new b.$(1))];
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpNewCallee = b.$;
a = new tmpNewCallee(1);
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output


`````js filename=intro
const tmpClusterSSA_a = new $(1);
const obj = {};
obj[tmpClusterSSA_a];
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = new $( 1 );
const b = {};
b[ a ];
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
