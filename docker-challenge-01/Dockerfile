FROM golang:1.21-alpine as build

WORKDIR /src

COPY <<EOF /src/main.go
package main

import "fmt"

func main() {
  fmt.Println("Full Cycle rocks!")
}
EOF
RUN go build -o /bin/hello_full_cycle ./main.go

FROM scratch
COPY --from=build /bin/hello_full_cycle /bin/hello_full_cycle
CMD ["/bin/hello_full_cycle"]
