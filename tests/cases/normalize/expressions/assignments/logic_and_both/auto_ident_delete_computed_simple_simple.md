# Preval test case

# auto_ident_delete_computed_simple_simple.md

> normalize > expressions > assignments > logic_and_both > auto_ident_delete_computed_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete x["y"]) && (a = delete x["y"]));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = delete x['y'];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpNestedComplexRhs = delete x['y'];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
a = delete x['y'];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpNestedComplexRhs = delete x['y'];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: true
 - 2: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
