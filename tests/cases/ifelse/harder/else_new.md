# Preval test case

# else_new.md

> ifelse > harder > else_new
>
> The `new` operator is guaranteed to return an object which is always truthy

## Input

`````js filename=intro
if (new ($($))) $(2);
else $(3);
`````

## Normalized

`````js filename=intro
const tmpNewCallee = $($);
const tmpIfTest = new tmpNewCallee();
if (tmpIfTest) {
  $(2);
} else {
  $(3);
}
`````

## Output

`````js filename=intro
const tmpNewCallee = $($);
const tmpIfTest = new tmpNewCallee();
if (tmpIfTest) {
  $(2);
} else {
  $(3);
}
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 
 - 3: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
