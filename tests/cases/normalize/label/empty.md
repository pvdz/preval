# Preval test case

# empty.md

> normalize > label > empty
>
> Empty label body checks

#TODO

## Input

`````js filename=intro
$(1);
foo: ;
$(2);
`````

## Normalized

`````js filename=intro
$(1);
$(2);
`````

## Output

`````js filename=intro
$(1);
$(2);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
