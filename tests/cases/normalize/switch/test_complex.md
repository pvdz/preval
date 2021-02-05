# Preval test case

# test_complex.md

> normalize > switch > test_complex
>
> Normalize switches

#TODO

## Input

`````js filename=intro
switch ($(1)) {

}
`````

## Normalized

`````js filename=intro
const tmpSwitchTest = $(1);
{
  let tmpFallthrough = false;
}
`````

## Output

`````js filename=intro
$(1);
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
