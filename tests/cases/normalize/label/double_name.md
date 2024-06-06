# Preval test case

# double_name.md

> Normalize > Label > Double name
>
> Check the label renaming algo. The label names ought to be unique just like binding idents.

#TODO

## Input

`````js filename=intro
foo: {
  break foo;
}
foo: {
  break foo;
}
foo: {
  break foo;
}
`````

## Pre Normal


`````js filename=intro
foo: {
  break foo;
}
foo$1: {
  break foo$1;
}
foo$3: {
  break foo$3;
}
`````

## Normalized


`````js filename=intro

`````

## Output


`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
