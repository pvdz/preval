# Preval test case

# return_nan.md

> Pcode > Return nan

## Options

- pcode

## Input

`````js filename=intro
function f(a) {
  return NaN;
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
    [ return - NaN ]
`````




## Todos triggered


None


## Pcode result


Running function "f":

                                    pcode          =>   eval
 - `f()`                       => `null`           => `null`            Ok
 - `f(undefined)`              => `null`           => `null`            Ok
 - `f(null)`                   => `null`           => `null`            Ok
 - `f(true)`                   => `null`           => `null`            Ok
 - `f(false)`                  => `null`           => `null`            Ok
 - `f("")`                     => `null`           => `null`            Ok
 - `f("preval")`               => `null`           => `null`            Ok
 - `f(0)`                      => `null`           => `null`            Ok
 - `f(1)`                      => `null`           => `null`            Ok
 - `f(0, 0)`                   => `null`           => `null`            Ok
 - `f(0, 1)`                   => `null`           => `null`            Ok
 - `f(1, 0)`                   => `null`           => `null`            Ok
 - `f(1, 1)`                   => `null`           => `null`            Ok
 - `f(1)`                      => `null`           => `null`            Ok
 - `f(2)`                      => `null`           => `null`            Ok
 - `f("a")`                    => `null`           => `null`            Ok
 - `f(true)`                   => `null`           => `null`            Ok
