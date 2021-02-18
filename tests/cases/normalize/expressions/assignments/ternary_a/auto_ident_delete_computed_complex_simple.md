# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > assignments > ternary_a > auto_ident_delete_computed_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete $(arg)["y"]) ? $(100) : $(200));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = 'y';
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
let tmpCalleeParam = undefined;
const tmpDeleteCompObj = $(arg);
const SSA_a = delete tmpDeleteCompObj['y'];
if (SSA_a) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
$(tmpCalleeParam);
$(SSA_a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: 100
 - 3: 100
 - 4: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
