# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident delete computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$`before ${(a = delete arg[$("y")])} after`;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $('y');
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const tmpCalleeParam = ['before ', ' after'];
const tmpDeleteCompProp = $('y');
const SSA_a = delete arg[tmpDeleteCompProp];
$(tmpCalleeParam, SSA_a);
$(SSA_a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'y'
 - 2: ['before ', ' after'], true
 - 3: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
