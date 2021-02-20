# Preval test case

# else_infinity.md

> Ifelse > Simple > Else infinity
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (Infinity) $(1);
else $(2);
`````

## Normalized

`````js filename=intro
if (Infinity) {
  $(1);
} else {
  $(2);
}
`````

## Output

`````js filename=intro
if (Infinity) {
  $(1);
} else {
  $(2);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
