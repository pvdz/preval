# Preval test case

# auto_ident_delete_computed_simple_simple.md

> normalize > expressions > assignments > logic_or_both > auto_ident_delete_computed_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete arg["y"]) || (a = delete arg["y"]));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = delete arg['y'];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpNestedComplexRhs = delete arg['y'];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
a = delete arg['y'];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpNestedComplexRhs = delete arg['y'];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: true
 - 2: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
