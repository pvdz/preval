# Preval test case

# if_with_block.md

> Ifelse > Simple > If with block
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (true) {
  $();
}
`````

## Normalized

`````js filename=intro
$();
`````

## Output

`````js filename=intro
$();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
