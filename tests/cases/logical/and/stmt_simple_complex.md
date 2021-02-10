# Preval test case

# simple_complex.md

> logical > and > simple_complex
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
1 && $(2);
`````

## Normalized

`````js filename=intro
{
  $(2);
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
