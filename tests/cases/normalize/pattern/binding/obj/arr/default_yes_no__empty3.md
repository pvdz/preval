# Preval test case

# default_yes_no__empty.md

> normalize > pattern >  > param > obj > arr > default_yes_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const val = true ? false : undefined
$(val);
`````

## Normalized

`````js filename=intro
let val;
if (true) {
  val = false;
} else {
  val = undefined;
}
$(val);
`````

## Output

`````js filename=intro
let val;
val = false;
$(val);
`````

## Result

Should call `$` with:
 - 0: false
 - 1: undefined

Normalized calls: Same

Final output calls: Same