# Preval test case

# simple_simple.md

> logical > and > simple_simple
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
1 || 2;
`````

## Normalized

`````js filename=intro
if (1) {
} else {
  2;
}
`````

## Output

`````js filename=intro

`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
