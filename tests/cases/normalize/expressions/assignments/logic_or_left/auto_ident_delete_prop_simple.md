# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Assignments > Logic or left > Auto ident delete prop simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete arg.y) || $(100));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = delete arg.y;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  tmpCalleeParam = $(100);
}
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const SSA_a = delete arg.y;
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
} else {
  tmpCalleeParam = $(100);
}
$(tmpCalleeParam);
$(SSA_a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
