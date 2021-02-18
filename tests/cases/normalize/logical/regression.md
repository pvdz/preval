# Preval test case

# regression.md

> normalize > logical > regression
>
> This particular case was breaking

#TODO

## Input

`````js filename=intro
if (false || $(2)) {
  {}
}
`````

## Normalized

`````js filename=intro
let tmpIfTest = false;
if (tmpIfTest) {
} else {
  tmpIfTest = $(2);
}
`````

## Output

`````js filename=intro
$(2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
