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
foo_1: {
  break foo_1;
}
foo_2: {
  break foo_2;
}
`````

## Normalized

`````js filename=intro
foo: {
  break foo;
}
foo_1: {
  break foo_1;
}
foo_2: {
  break foo_2;
}
`````

## Output

`````js filename=intro
foo: {
  break foo;
}
foo_1: {
  break foo_1;
}
foo_2: {
  break foo_2;
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
