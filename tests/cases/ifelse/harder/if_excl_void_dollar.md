# Preval test case

# if_false.md

> ifelse > simple > if_false
>
> Eliminate simple tautology

This should decompose into calling $(1) and $(2)

## Input

`````js filename=intro
if (!void $(1)) $(2);
`````

## Normalized

`````js filename=intro
$(1);
const tmpIfTest = undefined;
if (tmpIfTest) {
} else {
  $(2);
}
`````

## Output

`````js filename=intro
$(1);
$(2);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: undefined

Normalized calls: Same

Final output calls: Same
