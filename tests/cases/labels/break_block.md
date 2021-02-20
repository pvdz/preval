# Preval test case

# break_block.md

> Labels > Break block
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

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
