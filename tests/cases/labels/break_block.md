# Preval test case

# break_block.md

> labels > break_block
>
> Labels should not throw

#TODO

## Input

`````js filename=intro
foo: {


  break foo;
}
`````

## Normalized

`````js filename=intro
foo: {
  break foo;
}
`````

## Output

`````js filename=intro
foo: {
  break foo;
}
`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same