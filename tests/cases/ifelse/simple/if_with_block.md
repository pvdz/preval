# Preval test case

# if_with_block.md

> ifelse > simple > if_with_block
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
{
  $();
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
