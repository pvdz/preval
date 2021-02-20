# Preval test case

# auto_ident_new_computed_simple_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident new computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new b[$("$")](1)) + (a = new b[$("$")](1)));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCompObj = b;
const tmpCompProp = $('$');
const tmpNewCallee = tmpCompObj[tmpCompProp];
a = new tmpNewCallee(1);
let tmpBinBothLhs = a;
const tmpCompObj$1 = b;
const tmpCompProp$1 = $('$');
const tmpNewCallee$1 = tmpCompObj$1[tmpCompProp$1];
a = new tmpNewCallee$1(1);
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpCompProp = $('$');
const tmpNewCallee = b[tmpCompProp];
const SSA_a = new tmpNewCallee(1);
const tmpCompProp$1 = $('$');
const tmpNewCallee$1 = b[tmpCompProp$1];
const SSA_a$1 = new tmpNewCallee$1(1);
const tmpCalleeParam = SSA_a + SSA_a$1;
$(tmpCalleeParam);
$(SSA_a$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: '$'
 - 4: 1
 - 5: '[object Object][object Object]'
 - 6: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
