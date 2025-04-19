# Preval test case

# return_tpl.md

> Pcode > Return tpl

## Options

- pcode

## Input

`````js filename=intro
function f(a) {
  return `haha ${a}`;
}

$(f(1));
$(f(2));
$(f('a'));
$(f(true));
`````


## Pcode output


`````fileintro
f =
    [ r0 = $$0 - ]
    [ r1 = - "haha " ]
    [ r2 call $coerce {- undefined} r0 - - "string" ]
    [ r3 + r1 - r2 - ]
    [ r4 call $coerce {- undefined} r3 - - "plustr" ]
    [ return r4 - ]
`````




## Todos triggered


None


## Pcode result


Running function "f":

                                    pcode          =>   eval
 - `f()`                       => `"haha undefined"` => `"haha undefined"`  Ok
 - `f(undefined)`              => `"haha undefined"` => `"haha undefined"`  Ok
 - `f(null)`                   => `"haha null"`    => `"haha null"`     Ok
 - `f(true)`                   => `"haha true"`    => `"haha true"`     Ok
 - `f(false)`                  => `"haha false"`   => `"haha false"`    Ok
 - `f("")`                     => `"haha "`        => `"haha "`         Ok
 - `f("preval")`               => `"haha preval"`  => `"haha preval"`   Ok
 - `f(0)`                      => `"haha 0"`       => `"haha 0"`        Ok
 - `f(1)`                      => `"haha 1"`       => `"haha 1"`        Ok
 - `f(0, 0)`                   => `"haha 0"`       => `"haha 0"`        Ok
 - `f(0, 1)`                   => `"haha 0"`       => `"haha 0"`        Ok
 - `f(1, 0)`                   => `"haha 1"`       => `"haha 1"`        Ok
 - `f(1, 1)`                   => `"haha 1"`       => `"haha 1"`        Ok
 - `f(1)`                      => `"haha 1"`       => `"haha 1"`        Ok
 - `f(2)`                      => `"haha 2"`       => `"haha 2"`        Ok
 - `f("a")`                    => `"haha a"`       => `"haha a"`        Ok
 - `f(true)`                   => `"haha true"`    => `"haha true"`     Ok
